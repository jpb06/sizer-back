import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { mocked } from 'ts-jest/utils';

export const mockOAuth2ClientVerifyIdToken = (
  getPayloadResult: TokenPayload | undefined,
) => {
  mocked(OAuth2Client).mockReturnValue({
    verifyIdToken: jest.fn().mockReturnValue({
      getPayload: jest.fn().mockReturnValue(getPayloadResult),
    }),
  } as unknown as OAuth2Client);
};
