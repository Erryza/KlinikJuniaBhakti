import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {LogoLaporan} from '../../assets/assets';
import {HeaderPage} from '../../components/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/id';

export default class LaporanDataPasien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDataPasien: [],
    };
  }

  async componentDidMount() {
    this.getDataPasien();
  }

  async getDataPasien() {
    const user = auth().currentUser;
    console.log(`user`, user);
    let snapshot = await firestore()
      .collection('users')
      .orderBy('createdAt', 'desc')
      .get();
    console.log(`snapshot`, snapshot);

    let listData = (snapshot).docs.map(doc => doc.data());
    console.log(`listData`, listData);
    this.setState({listDataPasien: listData});
  }

  render() {
    return (
      <View style={styles.containerPage}>
        <HeaderPage titleHeader="Laporan Data Pasien" />

        <View style={{alignItems: 'center'}}>
          <Image source={LogoLaporan} style={styles.logoRiwayat} />

          <View style={styles.container}>
            <View style={styles.containerTitle}>
              <View style={{width: 60}}>
                <Text style={styles.title}>No KTP</Text>
              </View>
              <View style={{width: 60}}>
                <Text style={styles.title}>Nama</Text>
              </View>
              <View style={{width: 60}}>
                <Text style={styles.title}>Alamat</Text>
              </View>
              <View style={{width: 60}}>
                <Text style={styles.title}>Telp</Text>
              </View>
            </View>

            <FlatList
              data={this.state.listDataPasien}
              renderItem={({item, index}) => (
                <View style={styles.content} key={index}>
                  <View style={styles.laporan}>
                    <View style={{width: 60}}>
                      <Text style={styles.dataLaporan}>{item.ktp}</Text>
                    </View>
                    <View style={{width: 60}}>
                      <Text style={styles.dataLaporan}>{item.nama}</Text>
                    </View>
                    <View style={{width: 60}}>
                      <Text style={styles.dataLaporan}>{item.alamat}</Text>
                    </View>
                    <View style={{width: 60}}>
                      <Text style={styles.dataLaporan}>{item.noHp}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.containerPenutup}>
          <View>
            <Text style={styles.textTgl}>Depok, {moment().format('LL')}</Text>
            <Text style={styles.textJabatan}>(Bag. Administrasi)</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  logoRiwayat: {
    width: 281,
    height: 64,
    marginVertical: 40,
  },
  container: {
    width: 330,
    height: 370,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  containerTitle: {
    width: 330,
    height: 30,
    backgroundColor: '#B1B7C2',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: 'Shippori-ExtraBold',
    fontSize: 11,
    color: '#020E8A',
  },
  content: {
    width: 330,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
  },
  laporan: {
    width: 330,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataLaporan: {
    fontFamily: 'Shippori-Regular',
    fontSize: 12,
    color: '#000',
  },
  containerPenutup: {
    alignItems: 'flex-end',
    marginRight: 15,
    marginTop: 20,
  },
  textTgl: {
    marginBottom: 50,
    fontSize: 11,
    fontFamily: 'Shippori-Medium',
    color: '#1E1C22',
  },
  textJabatan: {
    fontSize: 11,
    fontFamily: 'Shippori-Medium',
    color: '#1E1C22',
  },
});
