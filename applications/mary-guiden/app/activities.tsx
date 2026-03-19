import {
  GridCol,
  GridContainer,
  GridRow,
  useContentAlignment,
  useTextStyles,
  useTheme,
} from "@marys-ui";
import { useEffect, useMemo } from "react";
import { Text, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ElevatedContent = () => {
  const { theme } = useTheme();
  const textStyles = useTextStyles();
  const contentStyles: ViewStyle = useMemo(
    () => ({
      paddingHorizontal: theme.container.card.px,
      paddingBottom: theme.container.card.pyBottom,
      marginBottom: 24,
      paddingTop: theme.container.card.pyTopSmall,
      backgroundColor: theme.colors.surface.standard.elevated,
      borderRadius: theme.radius.cardStandard,
    }),
    [theme]
  );

  return (
    <View style={useContentAlignment(contentStyles)}>
      <Text style={[textStyles.titleM, { paddingBottom: 8 }]}>
        Overskrift elevated
      </Text>
      <Text style={textStyles.bodyS}>
        Denne tekst skal være alignet med teksten ovenover.
      </Text>
    </View>
  );
};

export default function Activities() {
  const { theme, setBrand } = useTheme();
  const textStyles = useTextStyles();

  useEffect(() => {
    setBrand("activity");
  }, [setBrand]);

  return (
    /* TODO: Create surface layer components and*/
    <View style={{ backgroundColor: theme.colors.surface.standard.default }}>
      <SafeAreaView>
        <GridContainer
          style={{
            paddingTop: theme.container.zone.pyTop,
            paddingBottom: theme.container.zone.pyBottom,
          }}
        >
          <GridRow>
            <GridCol span={2}>
              {/* TODO: Vertical spacing components or styles */}
              <View style={{ marginBottom: 24 }}>
                <Text style={[textStyles.displayM, { paddingBottom: 8 }]}>
                  Overskrift her
                </Text>
                <Text style={[textStyles.bodyM, { paddingBottom: 8 }]}>
                  Tekst der omhandler aktiviteter. En kort beskrivelse kun.
                </Text>
              </View>
            </GridCol>
          </GridRow>
          <GridRow contained={false}>
            <GridCol span={2}>
              <ElevatedContent />
            </GridCol>
          </GridRow>
        </GridContainer>
      </SafeAreaView>
    </View>
  );
}
