import React from 'react';
import { Button, View, Alert } from 'react-native';

export default function App() {
    return (
       <View style={{ marginTop: 50 }}>
          <Button
            title="Pressione-me"
            onPress={() => Alert.alert('Botão pressionado!')}
        />
       </View>
    );
}