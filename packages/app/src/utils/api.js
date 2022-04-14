// import 'whatwg-fetch';

const END_POINT = 'http://localhost:3001';

export function searchParams(params) {
  const paramsList = [];
  Object.keys(params).forEach((k) => {
      paramsList.push(`${k}=${params[k]}`);
  });
  return paramsList.join('&');
}

export async function parseJsonResponse(response) {
  let json = null;
  try {
      json = await response.json();
  } catch (e) {
      // TODO Do something if response has no, or invalid JSON
  }

  if (response.ok) {
      return json;
  } else {
      let error = new Error(response.statusText);
      error.isFromServer = true;
      error.response = response;
      error.responseJson = json;

      throw error;
  }
}

export const apiRequest = async ({ url, params, body, method = 'POST' }) => {
  let path = `${END_POINT}/${url}`;

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  if (params) {
    path += `?${searchParams(params)}`;
  }

  const response = await window.fetch(path, requestOptions);
  return parseJsonResponse(response);
};
