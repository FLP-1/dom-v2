/**
 * @fileoverview IconCardGrid Component - DOM v2
 * @description Grid responsivo para organizar IconCards
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Spacing, Breakpoints } from '../../styles/design-tokens';
import IconCard, { IconCardProps } from './IconCard';

export interface IconCardGridProps {
  items: IconCardProps[];
  columns?: number;
  spacing?: number;
  scrollable?: boolean;
  style?: any;
  contentContainerStyle?: any;
}

export const IconCardGrid: React.FC<IconCardGridProps> = ({
  items,
  columns = 2,
  spacing = Spacing.sm,
  scrollable = true,
  style,
  contentContainerStyle
}) => {
  const renderGrid = () => {
    const gridItems = [];
    
    for (let i = 0; i < items.length; i += columns) {
      const row = items.slice(i, i + columns);
      const rowItems = row.map((item, index) => (
        <View key={`${i}-${index}`} style={[styles.item, { flex: 1 / columns }]}>
          <IconCard {...item} />
        </View>
      ));
      
      while (rowItems.length < columns) {
        rowItems.push(
          <View key={`empty-${i}-${rowItems.length}`} style={[styles.item, { flex: 1 / columns }]} />
        );
      }
      
      gridItems.push(
        <View key={`row-${i}`} style={[styles.row, { marginBottom: spacing }]}>
          {rowItems}
        </View>
      );
    }
    
    return gridItems;
  };

  const content = (
    <View style={[styles.container, style]}>
      {renderGrid()}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: Spacing.md
  },
  container: {
    flex: 1,
    padding: Spacing.md
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  item: {
    marginHorizontal: Spacing.xs
  }
});

export default IconCardGrid;