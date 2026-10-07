export function marcarResposta(req, res, next) {
  res.set('x-aula', '07');

  next();
}