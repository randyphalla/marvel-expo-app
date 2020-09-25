import React, { FC, ReactNode } from 'react';
import styled from 'styled-components/native';

export type SectionTitleProps = {
  title?: string;
  children?: ReactNode | string;
};

const SectionTitleView = styled.View`
  margin-bottom: 16px;
`;

const SectionTitleText = styled.Text`
  margin-bottom: 6px;
  font-size: 20px;
  font-weight: 800;
`;

const SectionTitle: FC<SectionTitleProps> = (props: SectionTitleProps) => {
  return (
    <SectionTitleView>
      <SectionTitleText>{ props.title }</SectionTitleText>
      { props.children }
    </SectionTitleView>
  )
}

SectionTitle.defaultProps = {
  title: 'Your section title'
};

export default SectionTitle;