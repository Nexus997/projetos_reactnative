import { Text, TouchableOpacity, View } from 'react-native';
import { Gasto } from '../types/gasto';

type GastoItemProps = {
  gasto: Gasto;
  onRemover: (id: number) => void;
  onEditar: (id: number) => void;
};

export default function GastoItem({ gasto, onRemover, onEditar }: GastoItemProps) {
  return (
    <View>
      <Text>{gasto.descricao}</Text>
      <Text>{gasto.categoria}</Text>
      <Text>{gasto.valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}</Text>
      <TouchableOpacity onPress={() => onRemover(gasto.id)}>
        <Text>Excluir</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onEditar(gasto.id)}>
        <Text>Editar</Text>
      </TouchableOpacity>
    </View>
  );
}