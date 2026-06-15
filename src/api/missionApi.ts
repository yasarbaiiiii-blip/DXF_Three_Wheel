export type LoadMissionPayload = {
  path_name?: string;
  mission_file?: string;
  [key: string]: unknown;
};

export type LoadMissionToControllerPayload = {
  mission_id: string;
};

export type StartMissionPayload = {
  path_name?: string;
  mission_file?: string;
  auto_origin?: boolean;
  [key: string]: unknown;
};

export type MissionStatus = {
  state: string;
  rpp_state: number | null;
  rpp_state_name: string;
  dist_to_goal: number | null;
  speed: number | null;
  xtrack: number | null;
  [key: string]: unknown;
};

function apiUrl(apiBaseUrl: string, path: string) {
  return `${apiBaseUrl.replace(/\/$/, "")}${path}`;
}

function postJson(apiBaseUrl: string, path: string, payload?: unknown): Promise<Response> {
  return fetch(apiUrl(apiBaseUrl, path), {
    method: "POST",
    headers: payload === undefined ? undefined : { "Content-Type": "application/json" },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
}

export function loadMission(apiBaseUrl: string, payload: LoadMissionPayload): Promise<Response> {
  return postJson(apiBaseUrl, "/api/mission/load", payload);
}

export function loadMissionToController(
  apiBaseUrl: string,
  payload: LoadMissionToControllerPayload
): Promise<Response> {
  return postJson(apiBaseUrl, "/api/path/load-to-controller", payload);
}

export function getLoadedPath(apiBaseUrl: string): Promise<Response> {
  return fetch(apiUrl(apiBaseUrl, "/api/mission/loaded-path"), {
    method: "GET",
    headers: { Accept: "application/json" },
  });
}

export function startMission(apiBaseUrl: string, payload?: StartMissionPayload): Promise<Response> {
  return postJson(apiBaseUrl, "/api/mission/start", payload);
}

export function stopMission(apiBaseUrl: string): Promise<Response> {
  return postJson(apiBaseUrl, "/api/mission/stop");
}

export function abortMission(apiBaseUrl: string): Promise<Response> {
  return postJson(apiBaseUrl, "/api/mission/abort");
}

export async function getMissionStatus(apiBaseUrl: string, init?: RequestInit): Promise<MissionStatus> {
  const res = await fetch(apiUrl(apiBaseUrl, "/api/mission/status"), init);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return (await res.json()) as MissionStatus;
}
