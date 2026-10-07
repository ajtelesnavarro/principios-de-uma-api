export function formatarMoeda(valor) {
  if (typeof valor !== 'number' || !Number.isFinite(valor)) {
      throw new Error('Valor monetário inválido.');
  }

  return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  }).format(valor);
}