export type Categoria =
  'Alimentação' | 'Transporte' | 'Lazer' | 'Contas' | 'Outros';

export type Gasto = {
  id: number;
  descricao: string;
  valor: number;
  categoria: Categoria;
};