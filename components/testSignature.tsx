import React, { useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';

const SignatureScreen: React.FC = () => {
  const signatureRef = useRef<SignatureViewRef>(null);

  const handleSignature = (signature: string) => {
    console.log('Signature:', signature); // Base64 string of the signature
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const handleSave = () => {
    signatureRef.current?.readSignature();
  };

  return (
    <View style={styles.container}>
      <SignatureCanvas
        ref={signatureRef}
        onOK={handleSignature}
        onEmpty={() => console.log('Empty signature')}
        descriptionText="Sign here"
        clearText="Clear"
        confirmText="Save"
        webStyle={`
          .m-signature-pad--footer { display: none; } /* Hides footer buttons */
        `}
      />
      <View style={styles.buttons}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
});

export default SignatureScreen;
