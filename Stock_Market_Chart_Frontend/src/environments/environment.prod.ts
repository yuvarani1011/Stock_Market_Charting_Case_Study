import pkg from '../../auth_config.json';
export const environment = {
  production: true,
  auth: {
    domain:pkg.domain,
    clientId:pkg.clientId,
    redirectUri: window.location.origin,
  },
};
