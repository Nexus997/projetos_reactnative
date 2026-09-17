export type Categoria =
  'Alimentação' | 'Transporte' | 'Lazer' | 'Contas' | 'Outros';

export type Gasto = {
  descricao: string;
  valor: number;
  categoria: Categoria;
};