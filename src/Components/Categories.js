import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({
  activeCategory,
  categories,
  handleChangeCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonClassName = isActive
            ? " bg-amber-400"
            : " bg-black/10";

          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
              onPress={() => handleChangeCategory(cat.strCategory)}
            >
              <View className={"rounded-full p-[6px]" + activeButtonClassName}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* <Text>Categories</Text> */}
    </Animated.View>
  );
}
