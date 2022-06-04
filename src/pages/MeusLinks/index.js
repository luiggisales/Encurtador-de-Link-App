import React,{useState,useEffect} from 'react';
import { View ,Text ,StyleSheet , TouchableOpacity , ScrollView ,Alert} from 'react-native';
import {getLinkSave ,deleteLinks} from '../../services/storeLinks'
import { StatusBar } from 'expo-status-bar';
import IconBackMeusLinks from '../../assets/IconBackMeusLinks.svg';
import IconCrash from '../../assets/IconCrash.svg';
import { Modalize } from 'react-native-modalize';

import * as Clipboard from 'expo-clipboard';
import IconCloseModal from '../../assets/IconCloseModal.svg';
import IconPasteModalLinks from '../../assets/IconPasteModalLinks.svg';

const MeusLinks = ({navigation}) => {
  const [meuslinks,setMeusLinks] = useState([]);
  const [data, setData] = useState([]);
  const [listaVazia,setListaVazia] = useState(false);
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

  useEffect(()=>{
    async function buscarLinks(){
      const result = await getLinkSave('@encurtarLink');
  
      if (result.length === 0){
        setListaVazia(true)
      }
      setMeusLinks(result);
    }
    buscarLinks()
  },[])

  function openLink(link){
    setData(link);
    OpenModal();
  };
  async function deleteLink(id){
    const retorno = deleteLinks(meuslinks,id);
    if (retorno.length === 0){
      setListaVazia(true)
    }
    setMeusLinks(retorno)
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
          <IconBackMeusLinks width={45} height={45} color={'#fff'}/>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Meus links</Text>
      </View>
        

      <ScrollView style={{width: '100%',top: 100,marginLeft:'15%'}}>
        {meuslinks.map(link =>(
          <View key={link.id} style={styles.containerLink}>            
            <View style={styles.nameLinks} >
              <Text style={styles.textLink} numberOfLines={1} onPress={()=>openLink(link)}>
                {link.long_url}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonCrash} onPress={()=> deleteLink(link.id)}>
              <IconCrash width={25} height={25} color={'rgb(255, 84, 84);'}/>
            </TouchableOpacity>
          </View>
        ))}
        {listaVazia && (
        <View style={{flex:1,alignItems: 'center',justifyContent: 'center',marginLeft:'-15%',}}>
          <Text style={styles.text}>Sua Lista Esta Vazia!!</Text>
        </View>
      )}
      </ScrollView>

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
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#11233b',
    },
    text: {
        fontSize: 18,
        color: '#fff',
    },
    header: {
      width: '100%',
      position: 'absolute',
      top: 45,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'flex-start',
    },
    textHeader: {
      fontSize: 24,
      fontWeight: '500',
      color: '#fff',
      marginLeft: 15,
    },
    containerLink: {
      width: '80%',
      height: 46,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:  '#fff2',
      borderRadius: 8,
      marginTop: 8,
      paddingHorizontal: 12,
    },
    textLink: {
      color: '#fff',
      fontSize: 14,
    },
    buttonCrash: {
      position: 'absolute',
      right: -35,
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

export default MeusLinks;