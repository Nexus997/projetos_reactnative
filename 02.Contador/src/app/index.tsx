/*importações necessárias, os itens que usei no código */
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';


/* funções criadas para serem usadas pelos botões, para aumentar, diminuir e zerar o contador, além de uma função para renderizar a tela */
export default function HomeScreen() {
  const [contador, setContador] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [textoQuantidade, setTextoQuantidade] = useState('1');

  const aumentar = () => {
  setContador(contador + quantidade);
  };

  const diminuir = () => {
  if (contador >= quantidade) {
    setContador(contador - quantidade);
  }

  };
  const zerar = () => {
    setContador(0);
  };

  const alterarQuantidade = (texto: string) => {
  if (/^\d*$/.test(texto)) {

    if (texto === '') {
      setTextoQuantidade(texto);
    }

    if (Number(texto) > 0) {
      setTextoQuantidade(texto);
      setQuantidade(Number(texto));
    }
    }
  };
  return (
    <View 
        style={styles.container}>
      <Text style={styles.titulo}>Contador</Text>
      <View style={styles.caixaContador}>
        <Text style={styles.numero} 
              numberOfLines={1} 
        >
          {contador}
        </Text>
      </View>
      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={textoQuantidade}
        onChangeText={alterarQuantidade}
      />
      <View>

        <View
          style={styles.botoes}>

          <TouchableOpacity style={styles.botao} onPress={aumentar}>
            <Text style={styles.textoBotao}>Adicionar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={diminuir}>
            <Text style={styles.textoBotao}>Diminuir</Text>
          </TouchableOpacity>
        </View>

        <View
          style={styles.zerar}>

          <TouchableOpacity style={styles.botao} onPress={zerar}>
            <Text style={styles.textoBotao}>Zerar</Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 50,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 15,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: 200,
    textAlign: 'center',
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  zerar: {
    alignItems: 'center',
    marginTop: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  numero: {
    fontSize: 48,
    textAlign: 'center',
  },
  caixaContador: {
  padding: 20,
  borderWidth: 1,
  borderRadius: 10,
  backgroundColor: '#eeeeee',
  },
  label: {
  fontSize: 16,
  fontWeight: 'bold',
  },
  botao: {
  backgroundColor: '#007AFF',
  padding: 10,
  borderRadius: 8,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});