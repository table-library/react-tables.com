/* eslint-disable react/jsx-key */
import * as React from 'react';

import PrismHighlight, { defaultProps } from 'prism-react-renderer';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';

import { useDarkMode } from 'hooks/useDarkMode';

const Highlight = ({ code }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <PrismHighlight
      {...defaultProps}
      code={code}
      theme={isDarkMode ? nightOwl : nightOwlLight}
      language="jsx"
    >
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={className}
          style={{
            ...style,
            backgroundColor: 'var(--theme-ui-colors-background)',
            fontSize: 'small',
          }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </PrismHighlight>
  );
};

export { Highlight };
