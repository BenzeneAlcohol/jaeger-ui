// @flow

// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import SpanDetail from './SpanDetail';
import DetailState from './SpanDetail/DetailState';
import SpanTreeOffset from './SpanTreeOffset';
import TimelineRow from './TimelineRow';
import type { Log, Span } from '../../../types';

import './SpanDetailRow.css';

type SpanDetailRowProps = {
  color: string,
  columnDivision: number,
  detailState: DetailState,
  onDetailToggled: string => void,
  isFilteredOut: boolean,
  logItemToggle: (string, Log) => void,
  logsToggle: string => void,
  processToggle: string => void,
  span: Span,
  tagsToggle: string => void,
  traceStartTime: number,
};

export default class SpanDetailRow extends React.PureComponent<SpanDetailRowProps> {
  props: SpanDetailRowProps;

  _detailToggle = () => {
    this.props.onDetailToggled(this.props.span.spanID);
  };

  render() {
    const {
      color,
      columnDivision,
      detailState,
      isFilteredOut,
      logItemToggle,
      logsToggle,
      processToggle,
      span,
      tagsToggle,
      traceStartTime,
    } = this.props;
    return (
      <TimelineRow className={`detail-row ${isFilteredOut ? 'is-filtered-out' : ''}`}>
        <TimelineRow.Cell width={columnDivision}>
          <SpanTreeOffset level={span.depth + 1} />
          <span>
            <span
              className="detail-row-expanded-accent"
              onClick={this._detailToggle}
              style={{ borderColor: color }}
            />
          </span>
        </TimelineRow.Cell>
        <TimelineRow.Cell width={1 - columnDivision}>
          <div className="p2 detail-info-wrapper" style={{ borderTopColor: color }}>
            <SpanDetail
              detailState={detailState}
              logItemToggle={logItemToggle}
              logsToggle={logsToggle}
              processToggle={processToggle}
              span={span}
              tagsToggle={tagsToggle}
              traceStartTime={traceStartTime}
            />
          </div>
        </TimelineRow.Cell>
      </TimelineRow>
    );
  }
}