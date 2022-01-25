import dbUrl from "./dburl";

export const getFetch = (url) => {
  return fetch(`${dbUrl}/${url}`)
    .then((r) => r.json())
    .catch((err) => {
      console.log("Error", err.status, err.exception);
    });
};

export const postFetch = (url, body) => {
  return fetch(`${dbUrl}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Response: "application/json",
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());
};

export const patchFetch = (url, body) => {
  return fetch(`${dbUrl}/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Response: "application/json",
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());
};

export const deleteFetch = (url) => {
  return fetch(`${dbUrl}/${url}`, {
    method: "DELETE",
  }).then((r) => r.json());
};
