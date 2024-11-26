import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Banner from './elements/Banner'
import Svg, { Path, Polyline } from 'react-native-svg';
import { BlurView } from '@react-native-community/blur';

const HomeScreen: React.FC<any> = (navigation) => {
  return (
    <ScrollView >
      <View style={styles.container}>
        <Banner navigation={navigation}/>
        <View style={styles.box1}>
          <Text style={styles.textHeader}>Our Story</Text>
          <View style={styles.boxTitle}>
            <Svg width="41" height="9.146" viewBox="0 0 41 9.146">
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881.591L20.562 8.576.243.591"
              />
            </Svg>

            <Text style={styles.title}>about us</Text>
            <Svg width="41" height="9.146" viewBox="0 0 41 9.146">
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881.591L20.562 8.576.243.591"
              />
            </Svg>
          </View>
          <View style={styles.boxTitle1}>
            <View style={styles.boxImage1}>
              <Image style={styles.imageBox1} source={require('../../asset/image-home-box1-1.jpg')} />
              <Image style={styles.imageBox1} source={require('../../asset/image-home-box1-2.jpg')} />
            </View>
            <View style={styles.boxContent1}>
              <BlurView blurAmount={30} blurType="light" overlayColor="rgba(255, 255, 255, 0.05)">
                <Text style={styles.text}>Lorem ipsum dolor sit amet, consectet adipisicing eli sed do eiu sm
                  od tempor incididunt ut abore et dolore mag aliqua. Ut enim ad minm
                  eniam quis nostrud.</Text>
              </BlurView>
            </View>
          </View>

        </View>
        <View style={styles.box1}>
          <Text style={styles.textHeader}>Recommendations</Text>
          {/* <View style={styles.boxTitle}>
            <Svg width="41" height="9.146" viewBox="0 0 41 9.146">
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881.591L20.562 8.576.243.591"
              />
            </Svg>
            
            <Text style={styles.title}>Our best specialties</Text>
            <Svg width="41" height="9.146" viewBox="0 0 41 9.146">
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881.591L20.562 8.576.243.591"
              />
            </Svg>
          </View> */}
          <View style={styles.boxTitle1}>

            {/* <View style={styles.boxContent1}>
              <BlurView blurAmount={30} blurType="light" overlayColor="rgba(255, 255, 255, 0.05)">
                <Text style={styles.text}>Lorem ipsum dolor sit amet, consectet adipisicing eli sed do eiu sm
                od tempor incididunt ut abore et dolore mag aliqua. Ut enim ad minm
                eniam quis nostrud.</Text>
              </BlurView>
            </View> */}


            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectet adipisicing eli sed do eiu
              smotem por incididunt ut abore et dolore magali qua. Ut enim ad
              minm eni amquis nostrud exercitation.</Text>
          </View>
          <View>
            <Image style={styles.imageBox2} source={require('../../asset/image-home-box2-1.jpg')} />
            {/* <Image style={styles.imageBox1} source={require('../../asset/image-home-box1-2.jpg')} /> */}
          </View>
        </View>
        <View style={styles.box1}>
          <Text style={styles.textHeader}>Our food philosophy</Text>
          <View style={styles.boxTitle}>
            <Svg width="41" height="9.146" viewBox="0 0 41 9.146">
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881.591L20.562 8.576.243.591"
              />
            </Svg>

            <Text style={styles.title}>Our tips</Text>
            <Svg width="41" height="9.146" viewBox="0 0 41 9.146">
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881.591L20.562 8.576.243.591"
              />
            </Svg>
          </View>
          <View style={styles.boxImage1}>
            <Image style={styles.imageBox3} source={require('../../asset/image-home-box3-1.jpg')} />
            <View>
              <Text style={styles.textHeader}>Choose</Text>
              <Text style={styles.textBox3}>Lorem ipsum dolor sit amet, consectet adipisicing eli sed do eiu
                smotem por incididunt ut abore et dolore magali qua. Ut enim ad
                minm eni amquis nostrud exercitation.</Text>
            </View>
          </View>
          <View style={styles.boxImage1}>
            <View>
              <Text style={styles.textHeader}>Choose</Text>
              <Text style={styles.textBox3}>Lorem ipsum dolor sit amet, consectet adipisicing eli sed do eiu
                smotem por incididunt ut abore et dolore magali qua. Ut enim ad
                minm eni amquis nostrud exercitation.</Text>
            </View>
            <Image style={styles.imageBox3} source={require('../../asset/image-home-box3-2.jpg')} />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.svg}>
            <Svg
              width="34.875"
              height="46.938"
              viewBox="0 0 34.875 46.938"
            >
              <Polyline
                fill="none"
                stroke="#C9AB81"
                strokeMiterlimit="10"
                points="0.5,0.003 0.5,36.438 22.875,36.438"
              />
              <Polyline
                fill="none"
                stroke="#C9AB81"
                strokeMiterlimit="10"
                points="6.5,5.003 6.5,41.438 28.875,41.438"
              />
              <Polyline
                fill="none"
                stroke="#C9AB81"
                strokeMiterlimit="10"
                points="12.5,10.003 12.5,46.438 34.875,46.438"
              />
            </Svg>
          </View>
          <View>
            <Text style={styles.text}>Laurent Restaurant & Fine dining, 71 Madison Ave
              10013 New York, 914-309-7030, reservations@laurent.com
              Open: 09:00 am – 01:00 pm
            </Text>
          </View>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Facebook</Text>
              <View style={styles.line} />
              <View style={styles.line} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Instagram</Text>
              <View style={styles.line} />
              <View style={styles.line} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Trip Advisor</Text>
              <View style={styles.line} />
              <View style={styles.line} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'black',
    height: '100%',
  },
  text: {
    padding: 20,
    textAlign: 'center',
    color: 'white'
  },
  box1: {
    width: '100%',
    padding: 10,
  },
  textHeader: {
    textAlign: 'center',
    fontFamily: 'Miniver',
    fontSize: 15,
    color: '#C9AB81'
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    textTransform: 'uppercase',
    color: '#C9AB81',
    fontWeight: '500',
    paddingLeft: 10,
    paddingRight: 10
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  boxTitle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  boxImage1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'relative'
  },
  boxContent1: {
    width: 200,
    height: 'auto',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  imageBox1: {
    width: 150,
    height: 300,
    margin: 20,
    borderColor: '#C9AB81',
    borderWidth: 1,
  },
  imageBox2: {
    marginLeft: -200,
    height: 500,
  },
  imageBox3: {
    width: 150,
    height: 300,
    margin: 10,
  },
  textBox3: {
    textAlign: 'center',
    width: 170,
    height: 'auto',
    color: 'white'
  },
  footer: {
    marginTop: 20,
  },
  svg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 35,
    paddingHorizontal: 16,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    textAlign: 'center',
    paddingVertical: 8,
    color: 'white'
  },
  line: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#C9AB81',
    marginTop: 4,
  },
});

export default HomeScreen;
