import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { View, FlatList, SectionList, Text } from 'react-native'
import { Link } from 'expo-router'

import { CATEGORIES, MENU } from '@/utils/data/products'
import { useState, useRef } from 'react'
import { Product } from '@/components/product'
import { useCartStore } from '@/store/cart-store'

export default function Home() {
  const cartStore = useCartStore()
  const [category, setCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList>(null)

  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(category => category === selectedCategory)

    if(sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0
      })
    }
  }

  return (
    <View className="pt-8">
      <View>
        <Header title="Cardápio" cartQuantityItems={cartQuantityItems} />

        <FlatList
          data={CATEGORIES}
          keyExtractor={item => item}
          renderItem={({item}) => <CategoryButton title={item} isSelected={category === item} onPress={() => handleCategorySelect(item)} />}
          horizontal
          className='max-w-10 my-5'
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        />
      </View>

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({item}) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => 
          <Text className='text-xl text-white font-heading mt-8 mb-3'>
            {title}
          </Text>
        }
        className="px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </View>
  )
}