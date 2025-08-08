/**
 * @fileoverview Exemplo de Tela com Menu - DOM v2
 * @description Exemplo de como usar o BaseScreen com menu integrado
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconCard from '../components/ui/IconCard';
import IconCardGrid from '../components/ui/IconCardGrid';
import BaseScreen from '../components/base/BaseScreen';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../styles/design-tokens';
import { getMessage } from '../utils/messages-centralized';

interface ExampleScreenWithMenuProps {
  userProfile?: string;
  userPermissions?: string[];
  onNavigate?: (screen: string) => void;
}

export const ExampleScreenWithMenu: React.FC<ExampleScreenWithMenuProps> = ({
  userProfile = 'employer',
  userPermissions = ['employer', 'admin'],
  onNavigate
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNavigate = (screen: string) => {
    console.log(`Navegando para: ${screen}`);
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  const handleTestLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleTestError = () => {
    setError('Erro de exemplo para demonstrar o sistema');
    setTimeout(() => setError(null), 3000);
  };

  return (
    <BaseScreen
      title="Exemplo com Menu"
      loading={loading}
      error={error}
      showMenu={true}
      userProfile={userProfile}
      userPermissions={userPermissions}
      onNavigate={handleNavigate}
      headerRight={
        <View style={styles.headerActions}>
          <IconCard
        onPress={handleTestLoading}
        variant="primary"
        size="medium"
      />
          <IconCard
        onPress={handleTestError}
        variant="primary"
        size="medium"
      />
        </View>
      }
    >
      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoDescription}>
          </Text>
        </View>

        <IconCard
          title="Dashboard"
          variant="primary"
          size="medium"
        />

          <IconCard
          title="Financeiro"
          variant="primary"
          size="medium"
        />

          <IconCard
          title="RH"
          variant="primary"
          size="medium"
        />

          <IconCard
          title="Tarefas"
          variant="primary"
          size="medium"
        />
        </View>

        <IconCard
          title="25"
          variant="primary"
          size="medium"
        />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>20</Text>
              <Text style={styles.statLabel}>Ativas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Em Desenvolvimento</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Planejadas</Text>
            </View>
          </View>
        </View>

        <IconCard
            2. Navegue pelas categorias usando as abas{'\n'}
            4. Clique em qualquer funcionalidade para navegar{'\n'}
            5. O menu se adapta automaticamente ao seu perfil"
          variant="primary"
          size="medium"
        />
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  headerButtonText: {
    fontSize: 18,
  },
  infoCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  infoTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  infoDescription: {
    ...Typography.body,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  featureCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.small,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  featureTitle: {
    ...Typography.subtitle,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  featureDescription: {
    ...Typography.small,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  statsTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  statLabel: {
    ...Typography.small,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  instructionsCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  instructionsTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  instructionsText: {
    ...Typography.body,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
});

export default ExampleScreenWithMenu;