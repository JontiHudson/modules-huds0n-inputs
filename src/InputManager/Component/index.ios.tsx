import React from 'react';
import { View } from 'react-native';

import { onMount, getNodeId, useRef } from '@huds0n/utilities';

import { InputAccessoryView } from '../../InputAccessoryViewIOS';

import { SlideModal } from './slideModal/SlideModal';
import { AnimatedScreen } from './slideModal/AnimatedScreen';
import { SlideModalController } from './slideModal/helpers';
import * as Types from '../types';

export const InputManagerComponent = React.memo(
  (props: Types.InputManagerProps) => {
    const { focusedNodePadding = 20 } = props;

    const screenRef = useRef(null);

    onMount(
      () => {
        SlideModalController.focusedNodePadding = focusedNodePadding;
        SlideModalController.screenNodeId = getNodeId(screenRef);
      },
      { layout: 'AFTER' },
    );

    return (
      <View ref={screenRef} style={{ flex: 1, overflow: 'hidden' }}>
        <AnimatedScreen {...props} />
        <SlideModal {...props} />
        <InputAccessoryView {...props} />
      </View>
    );
  },
);

export const dismissInput = SlideModalController.dismissInput;
