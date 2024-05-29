import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, Pressable } from 'react-native';
import axios from 'axios';
import styles from './styles.js';
export default ({ route, navigation }) => {
    // Variável que recebe os dados da Lista e preeche os campos do form
    const [veiculos, setVeiculos] = useState(route.params ? route.params : {})
    //Função que Altera os dados utilizando a API
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await
                axios.put(`http://localhost:8081/veiculo/${veiculos.id_veiculo}`, veiculos);
            //navigation.goBack();
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.text}>Identificação</Text>
                <TextInput
                    readOnly
                    style={styles.input}
                    onChangeText={id_veiculo => setVeiculos({
                        ...veiculos, id_veiculo
                    })}
                    value={veiculos.id_veiculo}
                />
                <Text style={styles.text}>Digite a placa</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a placa"
                    onChangeText={placa => setVeiculos({
                        ...veiculos, placa
                    })}
                    value={veiculos.placa}
                />
                <Text style={styles.text}>Digite o ano</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o ano"
                    onChangeText={ano => setVeiculos({
                        ...veiculos, ano
                    })}
                    value={veiculos.ano}
                />
                <Text style={styles.text}>Digite a mensalidade</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a mensalidade"
                    onChangeText={mensalidade => setVeiculos({
                        ...veiculos, mensalidade
                    })}
                    value={veiculos.mensalidade}
                />
                 <Text style={styles.text}>Selecione o proprietário</Text>
                 <TextInput 
                    style={styles.input}
                    placeholder="Digite o proprietário"
                    onChangeText={fk_proprietario => setVeiculos({
                        ...veiculos, fk_proprietario
                    })}
                    value={veiculos.fk_proprietario}
                />
                <Pressable
                    style={[styles.botao, {
                        backgroundColor: "#1d75cd"
                    }]}
                    onPress={handleClick} >
                    <Text style={styles.botaoText}>Alterar</Text>
                </Pressable >
            </View>
        </SafeAreaView>
    )
}