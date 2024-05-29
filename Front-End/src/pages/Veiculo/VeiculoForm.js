import { View, Text, SafeAreaView, TextInput, Pressable, Picker } from 'react-native'
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './styles.js';
export default function VeiculoForm() {
    //Variáveis state
    const [placa, setPlaca] = useState("");
    const [ano, setAno] = useState("");
    const [mensalidade, setmensalidade] = useState("")
    const [fk_proprietario, setFkProprietario] = useState("");
    const [proprietarios, setProprietarios] = useState([]);
    //Função que Lista os dados utilizando a API
    const fetchAllProprietarios = async () => {
        try {
            const res = await
                axios.get("http://localhost:8081/proprietario");
            setProprietarios(res.data);
            Keyboard.dismiss();
        } catch (err) {
            console.log(err);
        }
    };
    //Função que inicia a listagem ao abrir o App
    useEffect(() => {
        fetchAllProprietarios();
    }, []);
    //Função que Cadastra os dados utilizando a API
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/veiculo", {
                placa: placa,
                ano: ano,
                mensalidade: mensalidade,
                fk_proprietario: fk_proprietario
            });
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.text}>Digite a placa</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a placa"
                    value={placa}
                    onChangeText={(texto) => setPlaca(texto)}
                />
                <Text style={styles.text}>Digite o ano</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o ano"
                    value={ano}
                    onChangeText={(texto) => setAno(texto)}
                />
                <Text style={styles.text}>Digite a mensalidade</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a mensalidade"
                    value={mensalidade}
                    onChangeText={(texto) => setmensalidade(texto)}
                />
                <Text style={styles.text}>Selecione o proprietário</Text>
                <Picker
                    selectedValue={fk_proprietario}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) =>
                        setFkProprietario(itemValue)
                    }>
                    {proprietarios.map((fk_proprietario) => {
                        return (
                            <Picker.Item
                                key={fk_proprietario.id_proprietario}
                                label={fk_proprietario.nome}
                                value={fk_proprietario.id_proprietario}
                            />
                        );
                    })}
                </Picker>
            </View>
            <View style={styles.areaBtn}>
                <Pressable
                    style={[styles.botao, {
                        backgroundColor: "#1d75cd"
                    }]}
                    onPress={handleClick} >
                    <Text style={styles.botaoText}>Cadastrar</Text>
                </Pressable >
            </View>
        </SafeAreaView>
    )
};