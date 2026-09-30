import { Text, TouchableOpacity, View } from 'react-native';
import { Gasto } from '../types/gasto';
import { StyleSheet } from 'react-native';
type GastoItemProps = {
  gasto: Gasto;
  onRemover: (id: number) => void;
  onEditar: (id: number) => void;
};

export default function GastoItem({ gasto, onRemover, onEditar }: GastoItemProps) {
  return (
    <View style={GastoItemStyles.container}>
      <View style={GastoItemStyles.card}> 
        <View>
          <Text style={GastoItemStyles.descricao}>{gasto.descricao}</Text>
          <Text style={GastoItemStyles.categoria}>{gasto.categoria}</Text>
        </View>


        <Text style={GastoItemStyles.valor}>{gasto.valor.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}</Text>
      </View>

      <View style={GastoItemStyles.botoes}>
        <TouchableOpacity   style={[GastoItemStyles.botao, GastoItemStyles.botaoExcluir]} onPress={() => onRemover(gasto.id)} >
          <Text style={GastoItemStyles.textBotao}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity   style={[GastoItemStyles.botao, GastoItemStyles.botaoEditar]} onPress={() => onEditar(gasto.id)}>
          <Text style={GastoItemStyles.textBotao}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const GastoItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,

  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
    
  },
  botao: {
    padding: 4,
    borderRadius: 5,
  
  },
  textBotao: {
  color: '#effeff',
},
  botaoExcluir: {

    borderRadius: 5,
    borderWidth:1,
    backgroundColor:'#850000'
  },
  botaoEditar: {

    borderRadius: 5,
    borderWidth:1,
    backgroundColor:'#174570'
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descricao:{
    fontSize:20,
  },
  categoria:{
    fontSize:12
  },
  valor:{
    fontSize: 18,
    fontWeight:'bold',
  },
});