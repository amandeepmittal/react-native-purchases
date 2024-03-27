/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Purchases, {
  CustomerInfo,
  PurchasesOffering,
  PurchasesPackage,
} from 'react-native-purchases';
import APIKeys from './app/APIKeys.tsx';
import RevenueCatUI from 'react-native-purchases-ui';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  const [offerings, setOfferings] = useState<PurchasesOffering[] | null>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const sectionContainerStyle = {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const fetchData = async (customerInfo: CustomerInfo) => {
    console.log('New customer Info:', customerInfo);
    setCustomerInfo(customerInfo);
  };

  useEffect(() => {
    // Initialize Purchases SDK and fetch customer info
    const initializePurchases = async () => {
      if (Platform.OS === 'android') {
        Purchases.configure({
          apiKey: APIKeys.google,
          // Add more configuration options as needed
        });
      } else {
        Purchases.configure({
          apiKey: APIKeys.apple,
          // Add more configuration options as needed
        });
      }

      Purchases.addCustomerInfoUpdateListener(fetchData);

      try {
        const info = await Purchases.getCustomerInfo();
        setCustomerInfo(info);
      } catch (error) {
        console.error('Failed to fetch customer info:', error);
      }

      const allOfferings = await Purchases.getOfferings();
      if (allOfferings.current !== null) {
        setOfferings([allOfferings.current]);
      }

      const appUserID = await Purchases.getAppUserID();
      console.log('App User ID:', appUserID);
    };

    initializePurchases();
  }, []);

  const purchasePackage = async (pkg: PurchasesPackage) => {
    try {
      await Purchases.purchasePackage(pkg);
      const updatedInfo = await Purchases.getCustomerInfo();
      setCustomerInfo(updatedInfo);
    } catch (error) {
      console.error('Purchase error:', error);
    }
  };

  const onPurchaseStarted = ({
    packageBeingPurchased,
  }: {
    packageBeingPurchased: PurchasesPackage;
  }) => {
    console.log('Purchase started:', packageBeingPurchased);
  };

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <View style={sectionContainerStyle}>
    //       <Text style={styles.sectionTitle}>Entitlements</Text>
    //       <Text style={styles.sectionDescription}>
    //         All entitlements: {JSON.stringify(customerInfo?.entitlements)}
    //       </Text>
    //     </View>
    //     <View style={sectionContainerStyle}>
    //       <Text style={styles.sectionTitle}>Available Products</Text>
    //       {offerings?.map(offering => (
    //         <View key={offering.identifier}>
    //           <TouchableOpacity
    //             style={styles.actionButton}
    //             onPress={() =>
    //               RevenueCatUI.presentPaywall({
    //                 offering: offering,
    //               })
    //             }>
    //             <Text style={styles.actionButtonText}>Present Paywall</Text>
    //           </TouchableOpacity>
    //           {offering.availablePackages.map(pkg => (
    //             <View key={pkg.identifier} style={styles.packageContainer}>
    //               <Text style={styles.packageText}>{pkg.product.title}</Text>
    //               <Text style={styles.packageText}>
    //                 {pkg.product.description}
    //               </Text>
    //               <Text style={styles.packageText}>
    //                 {pkg.product.priceString}
    //               </Text>
    //               <TouchableOpacity
    //                 style={styles.actionButton}
    //                 onPress={() => purchasePackage(pkg)}>
    //                 <Text style={styles.actionButtonText}>Buy</Text>
    //               </TouchableOpacity>
    //             </View>
    //           ))}
    //         </View>
    //       ))}
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>

  // <View style={styles.flex1}>
  //   <RevenueCatUI.Paywall
  //     options={{}}
  //     onPurchaseStarted={onPurchaseStarted}
  //   />
  // </View>

    <RevenueCatUI.PaywallFooterContainerView style={{backgroundColor: '#f8f8f8'}}
                                             options={{
                                             }}
                                             onPurchaseStarted={onPurchaseStarted}>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec
        ligula in dolor efficitur accumsan nec vel nisl. Sed vitae lectus eget
        odio volutpat bibendum. Duis condimentum venenatis nisl, nec vulputate
        quam bibendum eu. Integer id ex non augue feugiat ullamcorper vel sit
        amet elit. Vivamus eget justo vel risus feugiat hendrerit. Suspendisse
        in varius felis. Nullam venenatis justo nec massa tempus, nec vulputate
        nisl congue. Duis rhoncus velit at sapien consectetur, et euismod purus
        rhoncus. Sed eget nisl nec lacus facilisis sagittis. Sed vel metus vel
        libero sodales rhoncus. Fusce eget magna vel justo venenatis posuere ac
        at nulla. Donec consequat elit ut ligula ultrices, vel pharetra elit
        dapibus. Morbi eu vestibulum libero. Nam fermentum neque eget felis
        tincidunt, in finibus ligula efficitur. Quisque sit amet elit nec libero
        condimentum ullamcorper. Integer auctor eros vel lacus aliquam, nec
        eleifend urna cursus. Vestibulum et leo vitae elit bibendum tristique.
        Phasellus tincidunt felis vitae felis sagittis, a euismod libero
        hendrerit. Ut at nibh vel nunc ultrices convallis. In hac habitasse
        platea dictumst. Sed vel sodales velit. Nulla tincidunt nisi id urna
        tincidunt, a fringilla neque suscipit. Vestibulum in sagittis lectus.
        Vivamus nec bibendum velit. In non odio eu ligula scelerisque accumsan.
        Duis condimentum, augue et tincidunt fringilla, dui elit vulputate
        mauris, vel fermentum justo neque nec felis. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Proin nec ligula in dolor efficitur
        accumsan nec vel nisl. Sed vitae lectus eget odio volutpat bibendum.
        Duis condimentum venenatis nisl, nec vulputate quam bibendum eu. Integer
        id ex non augue feugiat ullamcorper vel sit amet elit. Vivamus eget
        justo vel risus feugiat hendrerit. Suspendisse in varius felis. Nullam
        venenatis justo nec massa tempus, nec vulputate nisl congue. Duis
        rhoncus velit at sapien consectetur, et euismod purus rhoncus. Sed eget
        nisl nec lacus facilisis sagittis. Sed vel metus vel libero sodales
        rhoncus. Fusce eget magna vel justo venenatis posuere ac at nulla. Donec
        consequat elit ut ligula ultrices, vel pharetra elit dapibus. Morbi eu
        vestibulum libero. Nam fermentum neque eget felis tincidunt, in finibus
        ligula efficitur. Quisque sit amet elit nec libero condimentum
        ullamcorper. Integer auctor eros vel lacus aliquam, nec eleifend urna
        cursus. Vestibulum et leo vitae elit bibendum tristique. Phasellus
        tincidunt felis vitae felis sagittis, a euismod libero hendrerit. Ut at
        nibh vel nunc ultrices convallis. In hac habitasse platea dictumst. Sed
        vel sodales velit. Nulla tincidunt nisi id urna tincidunt, a fringilla
        neque suscipit. Vestibulum in sagittis lectus. Vivamus nec bibendum
        velit. In non odio eu ligula scelerisque accumsan. Duis condimentum,
        augue et tincidunt fringilla, dui elit vulputate mauris, vel fermentum
        justo neque nec felis.
      </Text>
    </RevenueCatUI.PaywallFooterContainerView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  packageText: {
    fontSize: 16,
    margin: 5,
  },
  packageContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.lighter,
    borderRadius: 5,
  },
  actionButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paywall: {
    height: 200,
  },
  flex1: {
    flex: 1,
  },
});

export default App;
