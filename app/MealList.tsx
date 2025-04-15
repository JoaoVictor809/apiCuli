import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Modal,} from 'react-native';
import axios from 'axios';
import {getData} from '../hooks/getData'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}



const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const insets = useSafeAreaInsets();

  const {getMeal} = getData();

  const callGetData = async () => {
    setLoading(true); 
    setError(null);   
    const foodResponse = await getMeal();
    console.log('Resposta processada:', foodResponse); 

    if (!foodResponse.error) {
      setCategories(foodResponse.categories);
    } else {
      setError(foodResponse.message); 
    }
    setLoading(false); 
  };

  useEffect(() => {
    callGetData();
  }, []);

  

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>Categorias de Refeições</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item)} style={styles.categoryItem}>
            <Image source={{ uri: item.strCategoryThumb }} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{item.strCategory}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false} // Adicionado para remover a barra de rolagem
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedCategory && (
            <>
              <Text style={styles.modalTitle}>{selectedCategory.strCategory}</Text>
              <Image source={{ uri: selectedCategory.strCategoryThumb }} style={styles.modalImage} />
              <Text style={styles.modalDescription}>{selectedCategory.strCategoryDescription}</Text>
            </>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryList;