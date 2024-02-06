import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { View, FlatList } from 'react-native'

import { CATEGORIES } from '@/utils/data/products'
import { useState } from 'react'

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
  }

  return (
    <View className="pt-8">
      <Header title="Cardápio" cartQuantityItems={3} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item}
        renderItem={({item}) => <CategoryButton title={item} isSelected={category === item} onPress={() => handleCategorySelect(item)} />}
        horizontal
        className='max-w-10 mt-5'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
    </View>
  )
}