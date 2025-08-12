/**
 * @fileoverview VirtualizedList - Lista virtualizada para performance
 * @version 2.0.0
 * @generated 2025-01-27T11:30:00.000Z
 */

import React, { memo, useMemo, useCallback } from 'react';
import { FlatList, VirtualizedList as RNVirtualizedList, ListRenderItemInfo } from 'react-native';
import { BaseComponentProps } from './types/ComponentProps';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';

export interface VirtualizedListProps<T> extends BaseComponentProps {
  data: T[];
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement;
  itemHeight: number;
  overscan?: number;
  onEndReached?: () => void;
  keyExtractor?: (item: T, index: number) => string;
  estimatedItemSize?: number;
  windowSize?: number;
  maxToRenderPerBatch?: number;
  initialNumToRender?: number;
  removeClippedSubviews?: boolean;
}

export const VirtualizedList = memo(<T,>({
  data,
  renderItem,
  itemHeight,
  overscan = 10,
  onEndReached,
  keyExtractor,
  estimatedItemSize,
  windowSize = 21,
  maxToRenderPerBatch = 10,
  initialNumToRender = 10,
  removeClippedSubviews = true,
  ...props
}: VirtualizedListProps<T>) => {
  const performanceData = usePerformanceMonitor('VirtualizedList');
  
  const getItem = useCallback((data: T[], index: number) => data[index], []);
  const getItemCount = useCallback((data: T[]) => data.length, []);
  
  const getItemLayout = useCallback((data: any, index: number) => ({
    length: estimatedItemSize || itemHeight,
    offset: (estimatedItemSize || itemHeight) * index,
    index,
  }), [itemHeight, estimatedItemSize]);
  
  const memoizedKeyExtractor = useMemo(() => {
    return keyExtractor || ((item: T, index: number) => `item-${index}`);
  }, [keyExtractor]);
  
  const optimizedRenderItem = useCallback((info: { item: T; index: number }) => {
    return renderItem(info as ListRenderItemInfo<T>);
  }, [renderItem]);

  // Usar FlatList para casos simples, VirtualizedList para casos complexos
  const useSimpleList = data.length < 100 && !estimatedItemSize;

  if (useSimpleList) {
    return (
      <FlatList
        data={data}
        renderItem={optimizedRenderItem}
        keyExtractor={memoizedKeyExtractor}
        onEndReached={onEndReached}
        initialNumToRender={initialNumToRender}
        maxToRenderPerBatch={maxToRenderPerBatch}
        windowSize={windowSize}
        removeClippedSubviews={removeClippedSubviews}
        getItemLayout={getItemLayout}
        {...props}
      />
    );
  }
  
  return (
    <RNVirtualizedList
      data={data}
      renderItem={optimizedRenderItem}
      getItem={getItem}
      getItemCount={getItemCount}
      getItemLayout={getItemLayout}
      keyExtractor={memoizedKeyExtractor}
      onEndReached={onEndReached}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      windowSize={windowSize}
      removeClippedSubviews={removeClippedSubviews}
      {...props}
    />
  );
});

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList;
