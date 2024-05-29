import { View, Text, SafeAreaView, Keyboard, FlatList } from 'react-native'
import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Icon, ListItem } from 'react-native-elements'
import styles from './styles.js'
export default VeiculoList => {
    //Variavel que recebe os dados da API
    const [veiculos, setVeiculos] = useState([])
    //Função que deleta os dados utilizando a API
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/veiculo/${id}`)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    //Função que lista os dados utilizando a API
    const fetchAllVeiculos = async () => {
        try {
            const res = await axios.get('http://localhost:8081/veiculo')
            setVeiculos(res.data)
            Keyboard.dismiss()
        } catch (err) {
            console.log(err)
        }
    }
    //Função que inicia a listagem ao abrir o App
    useEffect(() => {
        fetchAllVeiculos()
    }, [])
    //Função para criar os botões Deletar e Editar na Função Listagem
    function getActions(data) {
        return (
            <>
                <Button
                    onPress={() =>
                        VeiculoList.navigation.navigate('VeiculoEdit', data)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />}
                />
                <Button
                    onPress={() => handleDelete(data.id_veiculo)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                />
            </>
        )
    }
    //Função que preenche a Lista e Joga no FlatList
    function Listagem({ data }) {
        return (
            <ListItem bottomDivider >
                <ListItem.Content>
                    <ListItem.Title>{data.placa}</ListItem.Title>
                    <ListItem.Subtitle>{data.ano}</ListItem.Subtitle>
                    <ListItem.Subtitle>{data.mensalidade}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(data)}
            </ListItem>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}>Lista de Veículos</Text>
            </View>
            <FlatList
                data={veiculos}
                renderItem={({ item }) => <Listagem data={item} />}
                keyExtractor={item => item.id_veiculo}
            />
        </SafeAreaView>
    )
}