    import React from 'react';
    import { Button, View, Alert, Text } from 'react-native';

    export default function App() {

        function mostrarAlerta() {
            Alert.alert("Esta é minha primeira aula")
        }
        function mostrarOutroAlerta() {
            Alert.alert("Você clicou no segundo botão!")
        }
        return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 20, color: 'blue', marginBottom:20}}>
                Este é um exemplo de componente de texto.
        </Text>
        <View style={{ flexDirection: 'row'}}>
        <Button
        title="Mostrar Alerta" 
        onPress={mostrarAlerta}
        />
            <Button
        title="Mostrar Outro Alerta" 
        onPress={mostrarOutroAlerta}
        />
        </View>
        </View>
        );  
    }
        