import makerjs from "makerjs";

export function combineModels(
  models: { [id: string]: makerjs.IModel },
): makerjs.IModel {
  let keys = Object.keys(models);
  let combinedModel = makerjs.model.clone(models[keys[0]]);
  for (let i = 1; i < keys.length; i++) {
    combinedModel = makerjs.model.combineUnion(combinedModel, models[keys[i]]);
  }
  return combinedModel;
}

export function rotateModels(
  models: { [id: string]: makerjs.IModel },
  angle: number,
) {
  Object.keys(models).forEach((k: string) => {
    makerjs.model.rotate(models[k], angle);
  });
}
