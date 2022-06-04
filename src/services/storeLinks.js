import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getLinkSave(key){
    const mylinks = await AsyncStorage.getItem(key);

    let linksSaves = JSON.parse(mylinks) || [] // caso nao tenha nada salvo retornar um array vazio
    return linksSaves;
}

export async function saveLinkStorage(key,newlink){
    let linkStored = await getLinkSave(key);
    //Verificar links duplicados
    const resLink = linkStored.some(link =>link.id === newlink.id); //Verificar se no array existe um item igual

    if (resLink){
        Alert.alert('Atenção','ESSE LINK JA EXISTE NA LISTA')
        return;
    }

    linkStored.push(newlink);
    await AsyncStorage.setItem(key,JSON.stringify(linkStored));
    //Alert.alert('Atenção','LINK SALVO COM SUCESSO')
};

export function deleteLinks(Links,idItem){
    let mylinks = Links.filter(item =>{
        return(item.id !== idItem)
    })

    AsyncStorage.setItem('@encurtarLink',JSON.stringify(mylinks));
    return mylinks;
};