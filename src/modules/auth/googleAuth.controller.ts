import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/AppError";
import config from "../../config";
import { googleAuthService } from "./googleAuth.service";

const redirectToGoogle = catchAsync(async (req: Request, res: Response) => {
  if (!googleAuthService.isConfigured()) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      "Google login is not configured. Please use email login instead.",
    );
  }

  const state = googleAuthService.generateOAuthState();
  res.cookie("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 10,
  });

  const url = googleAuthService.getAuthorizationUrl(state);
  res.redirect(url);
});

const googleCallback = catchAsync(async (req: Request, res: Response) => {
  const { code, state, error } = req.query;

  const redirectWithError = (message: string) => {
    const loginUrl = `${config.client_url}/auth/login?error=${encodeURIComponent(message)}`;
    res.redirect(loginUrl);
  };

  try {
    if (error) {
      throw new Error(`Google login failed: ${error}`);
    }

    if (!code || !state) {
      throw new Error("Missing Google authorization code or state");
    }

    const expectedState = req.cookies.google_oauth_state;
    res.clearCookie("google_oauth_state");

    if (!expectedState || expectedState !== state) {
      throw new Error("Invalid OAuth state. Please try again.");
    }

    const { access_token } = await googleAuthService.exchangeCodeForTokens(String(code));
    const profile = await googleAuthService.fetchGoogleProfile(access_token);

    if (!profile.email || !profile.email_verified) {
      throw new Error("Google account email is not verified");
    }

    const tokens = await googleAuthService.googleLoginIntoDB({
      email: profile.email,
      name: profile.name || "Google User",
      picture: profile.picture,
    });

    const fragment =
      `#accessToken=${encodeURIComponent(tokens.accessToken)}` +
      `&refreshToken=${encodeURIComponent(tokens.refreshToken)}` +
      `&role=${tokens.role}`;

    res.redirect(`${config.client_url}/auth/oauth-callback${fragment}`);
  } catch (err) {
    redirectWithError(err instanceof Error ? err.message : "Google login failed");
  }
});

export const googleAuthController = {
  redirectToGoogle,
  googleCallback,
};
