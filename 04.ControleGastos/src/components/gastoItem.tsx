import { Text, View } from 'react-native';
import { Gasto } from '../types/gasto';

type GastoItemProps = {
  gasto: Gasto
};

export default function GastoItem({ gasto }: GastoItemProps) {
  return (
    <View>
      <Text>{gasto.descricao}</Text>
      <Text>{gasto.categoria}</Text>
      <Text>{gasto.valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}</Text>
    </View>
  );
}