import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Calendar } from "react-native-calendars";

import lojaImage from "./assets/images/loja.png";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const promotions = {
    "2024-11-29": {
      title: "Black Friday na Milla!!",
      description: "Toda a loja com até 50% de desconto, só na black da Milla!",
      whatsappLink:
        "https://wa.me/5561983803586?text=Quero aproveitar a Black!!",
    },
    "2024-12-10": {
      title: "Promoção 10% Off em Moda Praia!",
      description:
        "Compre qualquer item de moda praia e ganhe 10% de desconto.",
      whatsappLink:
        "https://wa.me/5561983803586?text=Olá, estou interessado na promoção de 10% Off em Moda Praia!",
    },
    "2024-12-12": {
      title: "Frete Grátis em Compras Acima de R$200",
      description:
        "Aproveite frete grátis para compras acima de R$200 em moda fitness.",
      whatsappLink:
        "https://wa.me/5561983803586?text=Quero saber mais sobre o frete grátis!",
    },
    "2024-12-18": {
      title: "Celebre o Natal com a Milla",
      description:
        "Nas compras acima de R$200,00 receba um brinde especial de Natal.",
      whatsappLink:
        "https://wa.me/5561983803586?text=Vim garantir meu brinde de Natal!",
    },
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (promotions[day.dateString]) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openWhatsApp = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening WhatsApp: ", err)
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <ImageBackground source={lojaImage} style={styles.imageBackground}>
        <View style={styles.overlay}>
          <Text style={styles.header}>As melhores Promos e Ofertas</Text>
          <Text style={styles.header}>Milla Praia & Fitness</Text>

          <View style={styles.calendarContainer}>
            <Calendar
              markedDates={Object.keys(promotions).reduce((acc, date) => {
                acc[date] = { marked: true, dotColor: "orange" };
                return acc;
              }, {})}
              onDayPress={handleDayPress}
              monthFormat={"MM yyyy"}
              markingType={"simple"}
            />
          </View>
        </View>
      </ImageBackground>

      {/* Modal de Promoção */}
      {showModal && selectedDate && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showModal}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {promotions[selectedDate].title}
              </Text>
              <Text style={styles.modalDescription}>
                {promotions[selectedDate].description}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  openWhatsApp(promotions[selectedDate].whatsappLink)
                }
                style={styles.whatsappButton}
              >
                <Text style={styles.whatsappButtonText}>
                  Falar com a gente no WhatsApp
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight || 0,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  calendarContainer: {
    width: "90%",
    height: "60%",
    marginTop: 80,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  whatsappButton: {
    backgroundColor: "#25d366",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  whatsappButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#ff6f61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default App;
