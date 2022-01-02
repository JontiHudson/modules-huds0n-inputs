import React from 'react';
import { View } from 'react-native';

import { theme } from '@huds0n/theming/src/theme';
import { onMount, useRef } from '@huds0n/utilities';

import { InputAccessoryView } from '../../InputAccessoryViewIOS';
import * as Types from '../../types';

import { SlideModal } from './slideModal/SlideModal';
import { AnimatedScreen } from './slideModal/AnimatedScreen';
import { initialise } from './slideModal/helpers';

export const InputManagerComponent = React.memo(
  (props: Types.InputManagerProps) => {
    const { focusedNodePadding = 20 } = props;

    const screenRef = useRef<View>(null);

    onMount(() => {
      initialise(focusedNodePadding, screenRef);
    });

    return (
      <View
        ref={screenRef}
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <AnimatedScreen {...props} />
        <SlideModal {...props} />
        <InputAccessoryView {...props} />
      </View>
    );
  },
);
