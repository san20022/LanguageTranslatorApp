import { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function App() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("Spanish");
  const [history, setHistory] = useState([]);

  const translateToSpanish = (input) => input + " (traducido al español)";
  const translateToFrench = (input) => input + " (traduit en français)";
  const translateToGerman = (input) => input + " (ins Deutsche übersetzt)";
  const translateToItalian = (input) => input + " (tradotto in italiano)";
  const translateToJapanese = (input) => input + " (日本語に翻訳されました)";
  const translateToKorean = (input) => input + " (한국어로 번역됨)";
  const translateToPortuguese = (input) => input + " (traduzido para português)";

  const translateText = () => {
    if (text.trim() === "") {
      Alert.alert("Input required", "Please enter some text to translate.");
      return;
    }

    let result = "";
    switch (language) {
      case "Spanish": result = translateToSpanish(text); break;
      case "French": result = translateToFrench(text); break;
      case "German": result = translateToGerman(text); break;
      case "Italian": result = translateToItalian(text); break;
      case "Japanese": result = translateToJapanese(text); break;
      case "Korean": result = translateToKorean(text); break;
      case "Portuguese": result = translateToPortuguese(text); break;
      default: result = text;
    }

    setTranslated(result);
    setHistory([{ input: text, language, result }, ...history]);
  };

  const clearAll = () => {
    setText("");
    setTranslated("");
  };

  const languages = [
    { name: "Spanish", flag: "🇪🇸" },
    { name: "French", flag: "🇫🇷" },
    { name: "German", flag: "🇩🇪" },
    { name: "Italian", flag: "🇮🇹" },
    { name: "Japanese", flag: "🇯🇵" },
    { name: "Korean", flag: "🇰🇷" },
    { name: "Portuguese", flag: "🇵🇹" }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌐 Language Translator</Text>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3898/3898150.png" }}
        style={styles.image}
      />
      <Text style={styles.description}>
        Enter text below and select a language to simulate translation.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Type your text here..."
        onChangeText={setText}
        value={text}
      />
      <Text style={styles.subtitle}>Select Language:</Text>
      <View style={styles.languageContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.name}
            style={[
              styles.languageButton,
              language === lang.name && styles.selectedButton
            ]}
            onPress={() => setLanguage(lang.name)}
          >
            <Text style={styles.languageText}>{lang.flag} {lang.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.selectedLanguage}>Selected: {language}</Text>
      <View style={styles.buttonRow}>
        <Button title="Translate" onPress={translateText} />
        <Button title="Clear" color="red" onPress={clearAll} />
      </View>
      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Translation Result:</Text>
        <Text style={styles.resultText}>{translated}</Text>
      </View>
      <View style={styles.historyBox}>
        <Text style={styles.historyTitle}>History:</Text>
        {history.length === 0 && <Text style={styles.historyItem}>No translations yet</Text>}
        {history.map((item, index) => (
          <View key={index} style={styles.historyItemBox}>
            <Text style={styles.historyItem}>
              {item.input} → {item.result} ({item.language})
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.footer}>💡 This app is for simulation purposes only</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f4f4f4', alignItems: 'center', justifyContent: 'flex-start', padding: 25 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  description: { textAlign: 'center', fontSize: 16, marginBottom: 20 },
  subtitle: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
  image: { width: 120, height: 120, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#999', width: '100%', padding: 12, marginBottom: 15, backgroundColor: 'white', borderRadius: 5 },
  languageContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 15 },
  languageButton: { backgroundColor: '#007AFF', padding: 10, margin: 5, borderRadius: 5 },
  selectedButton: { backgroundColor: '#0047AB' },
  languageText: { color: 'white', fontWeight: 'bold' },
  selectedLanguage: { fontSize: 16, marginBottom: 15 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 },
  resultBox: { width: '100%', backgroundColor: 'white', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', marginBottom: 15 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  resultText: { fontSize: 16 },
  historyBox: { width: '100%', marginTop: 10, padding: 10, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginBottom: 20 },
  historyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  historyItemBox: { marginBottom: 5 },
  historyItem: { fontSize: 14, color: '#333' },
  footer: { fontSize: 12, color: '#777', textAlign: 'center', marginTop: 20 }
});