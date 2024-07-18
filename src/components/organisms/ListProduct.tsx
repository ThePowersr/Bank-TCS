import { FlatList, FlatListProps, Text, View } from "react-native"
import { TypeProduct } from "../../types/product"
import Product from "../molecules/Product"
import ItemSeparator from "../atoms/ItemSeparator"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../navigator/Navigator";

interface Props {
  data: TypeProduct[] | undefined;
  //onPress: () => void;
  navigation?: StackNavigationProp<RootStackParams, "Home", undefined>;
  testID?: string;
  accessible?: boolean;
  accessibilityHint?: string;
  accessibilityLabel?: string;
}

const ListProduct = (props: Props) => {

  const { data, navigation, testID, accessible, accessibilityHint, accessibilityLabel } = props;

  return (
    <View testID={testID} style={{ borderWidth: 0.3, borderRadius: 4, maxHeight: '65%' }}>
      <FlatList
        testID='FlatListProduct'
        accessible={accessible}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <Product testID={item.id} id={item.id} name={item.name} onPress={() => navigation!.navigate("AdditionalInformationScreen", { simpleProduct: item })} />
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center' }} testID='text-no-product'>No se encontraron productos</Text>
        )}
      />
    </View>
  )
}

export default ListProduct
