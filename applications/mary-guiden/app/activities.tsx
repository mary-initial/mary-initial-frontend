import {
  GridCol,
  GridContainer,
  GridMode,
  GridRow,
  useContentStyles,
  useTextStyles,
  useTheme,
} from "@marys-ui";
import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ElevatedContent = () => {
  const { theme } = useTheme();
  const textStyles = useTextStyles();
  const contentStyles = useContentStyles();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        elevated: {
          paddingBottom: theme.container.card.pyBottom,
          marginBottom: 24,
          paddingTop: theme.container.card.pyTopSmall,
          backgroundColor: theme.colors.surface.standard.elevated,
          borderRadius: theme.radius.cardStandard,
        },
      }),
    [theme]
  );

  return (
    <View style={[contentStyles.container, styles.elevated]}>
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
    /* TODO: Create surface layer components */
    <View style={{ backgroundColor: theme.colors.surface.standard.default }}>
      <SafeAreaView>
        <View
          style={{
            paddingTop: theme.container.zone.pyTop,
            paddingBottom: theme.container.zone.pyBottom,
          }}
        >
          <GridContainer>
            <GridRow>
              <GridCol span={2}>
                {/* TODO: Vertical spacing components or styles */}
                <View style={{ marginBottom: 24 }}>
                  <Text style={[textStyles.displayM, { paddingBottom: 8 }]}>
                    Overskrift her
                  </Text>
                  <Text style={textStyles.bodyM}>
                    Tekst der omhandler aktiviteter. En kort beskrivelse kun.
                  </Text>
                </View>
              </GridCol>
            </GridRow>
          </GridContainer>
          <GridContainer gridMode={GridMode.Elevated}>
            <GridRow>
              <GridCol span={theme.grid.columns}>
                <ElevatedContent />
              </GridCol>
            </GridRow>
          </GridContainer>
        </View>
      </SafeAreaView>
    </View>
  );
}
