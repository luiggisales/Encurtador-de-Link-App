import { StatusBar } from 'expo-status-bar';
import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView ,
    Linking,
    Alert,
    TextInput } from 'react-native';

import Logo from '../../assets/Logo.svg';
import Logoinstagram from '../../assets/Instagram.svg';
import IconInput from '../../assets/IconInput.svg';
import IconCloseModal from '../../assets/IconCloseModal.svg';
import IconPasteModalLinks from '../../assets/IconPasteModalLinks.svg';

import { Modalize } from 'react-native-modalize';
import * as Clipboard from 'expo-clipboard';
import api from '../../services/api';
import { getLinkSave,saveLinkStorage } from '../../services/storeLinks';

const Home = ({navigation}) => {    
    const [url, setUrl ] = React.useState('https://www.instagram.com/luiggi_sales/');
    //const [urlGenerate, setUrlGenerate] = React.useState('')
    const [link, setLink ] = React.useState('');
    const [data, setData ] = React.useState('');

    const modalizeRef = React.useRef(null);

    function OpenModal(){
        modalizeRef.current?.open();
    }
    function CloseModalLinks(){
        modalizeRef.current?.close();
    }

    const CopiarURLGenerate = async () => {
        await Clipboard.setStringAsync(data.link);
        Alert.alert('Atenção','Texto Copiado')
    };


    async function EscurtarLink(){
        if (link == null || link == ''){
            Alert.alert('Atenção','Preencha o campo para continuar')
        }else {
            try {
                const response = await api.post('/shorten',{
                    long_url: link,
                })
                setData(response.data)
                saveLinkStorage('@encurtarLink',response.data)
                setLink('')
                OpenModal();
            }catch {
                Alert.alert('Atenção','Ops parece que algo deu errado')
                setLink('');
                CloseModalLinks();
            }
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light'/>
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonInta} onPress={()=> Linking.openURL(url)}>
                    <Logoinstagram width={25} height={24} color={'#fff'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMeusLinks} onPress={()=> navigation.navigate('MeusLinks')}>
                    <Text style={styles.textButtonLinks}>Meus Links</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerPrimary}>
                <View style={styles.containerLogo}>
                    <Logo width={125} height={125} color={'#fff'}/>
                </View>
                <Text style={styles.logoTitle}>Encurtador de Links</Text>
                <Text style={styles.SubTitle}>Cole seu link para encurtar 👇</Text>
                <View style={styles.containerInputAndButton}>
                    <View style={styles.containerInput}>
                        <IconInput width={18} height={18} color={'#fff'}/>
                        <TextInput style={styles.input} placeholder='Cole o seu Link Aqui' placeholderTextColor={'#fff'} value={link} onChangeText={setLink}/>
                    </View>
                    <TouchableOpacity style={styles.buttonGerarLink} onPress={EscurtarLink}>
                        <Text style={styles.textButtonGerarLink}>Gerar Link</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonfooter} onPress={()=>Linking.openURL('https://encurtador-link-web.herokuapp.com/')}>
                <Text style={styles.textFooter}>Visitar o site</Text>
            </TouchableOpacity>

            {/*Modal Onde o link é gerado */}
            <Modalize ref={modalizeRef} snapPoint={350}>
                <View style={styles.containerModalLinks}>
                    <View style={styles.headerModalLinks}>
                        <Text style={styles.titleModalLink}> Link Encurtado</Text>
                        <TouchableOpacity style={styles.buttonCloseModalLinks} onPress={CloseModalLinks}>
                            <IconCloseModal width={25} height={25} color={'#000'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.urlOriginal}>
                        <Text numberOfLines={1} style={{
                            width: '92%',
                            position: 'absolute',
                            top: -100,
                            marginLeft: 12.8,
                        }} onPress={
                            async ()=> {
                            await Clipboard.setStringAsync(data.long_url);
                            Alert.alert('Atenção','Texto Copiado')}}>{data.long_url}</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonCopyLinkGenerated} onPress={CopiarURLGenerate}>
                        <Text style={{color: '#fff'}}>{data.link}</Text>
                        <IconPasteModalLinks width={25} height={25} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
            </Modalize>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#11233b',
    },
    buttonInta: {
        margin: 'auto' && 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonMeusLinks: {
        marginTop: 5,
        marginRight: 12,
        padding: 12 && 12,
        borderRadius: 4,
        backgroundColor: '#fff',  
    },
    textButtonLinks: {
        fontSize: 20,
        color: '#000',
    },
    containerPrimary: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerLogo: {
        marginBottom: 8,
    },
    logoTitle: {
        fontSize: 35,
        fontWeight: '800',
        color: '#fff',
    },
    SubTitle: {
        fontSize: 18,
        color: '#fff',
    },
    containerInputAndButton: {
        width: 540,
        marginTop: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerInput: {
        width: 350,
        height: 46,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:  '#fff2',
        borderRadius: 8,
    },
    input: {
        width: 310,
        height: 46,
        fontSize: 18,
        color: '#fff',
        paddingLeft: 15,
    },
    buttonGerarLink: {
        width: 350,
        height: 46,
        marginTop: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    textButtonGerarLink: {
        fontSize: 25,
        color: '#000',
        fontWeight: '700',
    },
    buttonfooter: {
        marginBottom: 8,
    },
    textFooter: {
        fontSize: 18,
        color: '#fff',
    },
    containerModalLinks: {
        flex: 1,
        height: 350,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerModalLinks:{
        width: '100%',
        position: 'absolute',
        top: 12,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    titleModalLink: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    buttonCloseModalLinks: {
        margin: 'auto' && 15 && 8,
        left: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    urlOriginal: {
        width: '98%',
        display: 'flex',
        position: 'relative',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonCopyLinkGenerated: {
        width: '95%',
        height: 46,
        padding: 8,
        display: 'flex',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#172742',
    },
    nameLinks: {
    width:'100%',
    alignItems: 'center',
    },
});


export default Home;