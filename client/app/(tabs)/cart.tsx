import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../../contexts/useAuth';

interface CartItem {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  total_price: number;
}

export default function CartScreen() {
  const { user } = useAuth();
  const userId = user?.id || 1; // 임시 user ID
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`https://your-api.com/cart/active?user_id=${userId}`);
      setCartItems(res.data.items);
      setTotalAmount(res.data.total_amount);
    } catch (err) {
      console.error('장바구니 조회 실패', err);
    }
  };

  const updateQuantity = async (product_id: number, amount: number) => {
    try {
      await axios.post('https://your-api.com/cart/add_item', {
        user_id: userId,
        product_id,
        quantity: amount,
      });
      fetchCart();
    } catch {
      Alert.alert('수량 변경 실패');
    }
  };

  const deleteItem = async (product_id: number) => {
    try {
      await axios.delete('https://your-api.com/cart/delete_item', {
        data: { user_id: userId, product_id },
      });
      fetchCart();
    } catch {
      Alert.alert('삭제 실패');
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemRow}>
      <Text style={styles.productName}>{item.product_name}</Text>

      <View style={styles.controls}>
        <Pressable onPress={() => updateQuantity(item.product_id, -1)} style={styles.controlBtn}>
          <Text>－</Text>
        </Pressable>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Pressable onPress={() => updateQuantity(item.product_id, 1)} style={styles.controlBtn}>
          <Text>＋</Text>
        </Pressable>
      </View>

      <Text style={styles.price}>₩{item.price.toLocaleString()}</Text>

      <Pressable onPress={() => deleteItem(item.product_id)}>
        <Text style={styles.delete}>✕</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <View style={styles.footer}>
        <Pressable style={styles.payButton} onPress={() => Alert.alert('결제 진행')}>
          <Text style={styles.payText}>결제하기</Text>
          <Text style={styles.total}>총 {totalAmount.toLocaleString()}원</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  }, // 전체 화면 컨테이너

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  }, // 장바구니 아이템 한 줄 박스

  productName: {
    flex: 1,
    fontSize: 16,
  }, // 상품 이름 텍스트

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  }, // 수량 조절 버튼 + 숫자 묶음

  controlBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  }, // 수량 증감 버튼 스타일

  quantity: {
    fontSize: 16,
    marginHorizontal: 4,
  }, // 현재 수량 표시 텍스트

  price: {
    width: 80,
    textAlign: 'right',
    fontSize: 14,
  }, // 상품 가격 텍스트

  delete: {
    marginLeft: 10,
    fontSize: 18,
    color: '#888',
  }, // X(삭제) 버튼

  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  }, // 하단 결제 버튼 영역

  payButton: {
    backgroundColor: '#22C55E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  }, // '결제하기' 버튼 박스

  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }, // 결제 버튼 안 텍스트

  total: {
    color: '#fff',
    marginTop: 4,
  }, // 결제 버튼 안 총 금액 텍스트
});

