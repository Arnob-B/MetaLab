export enum msgTypes {
  toServerPosUpdate = "toServerPosUpdate",
  toServerCodeDemand = "toServerCodeDemand",
  toServerSaveCode = "toServerSaveCode",
  toServerAddToRoom = "toServerAddToRoom",
  toServerMonUpdate = "toServerMonUpdate",

  toPlayerPosUpdate = "toPlayerPosUpdate",
  toPlayerPlayerUpdate = "toPlayerPlayerUpdate",
  toPlayerMonUpdate = "toPlayerMonUpdate",
  toPlayerCodeResponse = "toPlayerCodeResponse",
  toPlayerSaveCodeResponse = "toPlayerSaveCodeResponse",
  toPlayerMap = "toPlayerMap",
};

export type toServerPosUpdate = {
  id: string,
  x: Number,
  y: Number,
}
export type toPlayerPosUpdate = {
  id: string,
  x: Number,
  y: Number,
}

export type toServerCodeDemand = {
  requestId: string,
}
export type toPlayerCodeResponse = {
  requestId: string,
  code: string
}
export type toServerSaveCode = {
  playerId: string,
  code: string
}
export type toServerAddToRoom = {
  playerId: string
}
