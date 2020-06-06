import React from 'react';
import Resizable from '../lib/Resizable';
import ResizableBox from '../lib/ResizableBox';
import 'style-loader!css-loader!../css/styles.css';
import 'style-loader!css-loader!./test.css';

export default class TestLayout extends React.Component<{}, {width: number, height: number}> {
  state = {
    width: 200,
    height: 200,
    fixedWidth: 200,
    fixedHeight: 200,
    fixedLeft: 100,
    fixedTop: 500
  };

  onClick = () => {
    this.setState({width: 200, height: 200});
  };

  onResize = (event, {element, size, handle}) => {
    this.setState({width: size.width, height: size.height});
  };
  onResizeFixed = (event, {element, size, handle}) => {
    this.setState((state) => {
      let newTop = state.fixedTop;
      let newLeft = state.fixedLeft;
      if (handle.indexOf('n') > -1) {
        const deltaHeight = size.height - state.fixedHeight;
        newTop -= deltaHeight;
      }
      if (handle.indexOf('w') > -1) {
        const deltaWidth = size.width - state.fixedWidth;
        newLeft -= deltaWidth;
      }
      return {
        fixedWidth: size.width,
        fixedHeight: size.height,
        fixedLeft: newLeft,
        fixedTop: newTop
      };
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick} style={{'marginBottom': '10px'}}>Reset first element's width/height</button>
        <div className="layoutRoot">
          <Resizable className="box" height={this.state.height} width={this.state.width} onResize={this.onResize} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}>
            <div className="box" style={{width: this.state.width + 'px', height: this.state.height + 'px'}}>
              <span className="text">{"Raw use of <Resizable> element. 200x200, all Resize Handles."}</span>
            </div>
          </Resizable>
          <ResizableBox className="box" width={200} height={200}>
            <span className="text">{"<ResizableBox>"}</span>
          </ResizableBox>
          <ResizableBox
            className="custom-box box"
            width={200}
            height={200}
            handle={<span className="custom-handle custom-handle-se" />}
            handleSize={[8, 8]}>
            <span className="text">{"<ResizableBox> with custom handle in SE corner."}</span>
          </ResizableBox>
          <ResizableBox
            className="custom-box box"
            width={200}
            height={200}
            handle={(h) => <span className={`custom-handle custom-handle-${h}`} />}
            handleSize={[8, 8]}
            resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}>
            <span className="text">{"<ResizableBox> with custom handles in all locations."}</span>
          </ResizableBox>
          <ResizableBox className="box" width={200} height={200} draggableOpts={{grid: [25, 25]}}>
            <span className="text">Resizable box that snaps to even intervals of 25px.</span>
          </ResizableBox>
          <ResizableBox className="box" width={200} height={200} minConstraints={[150, 150]} maxConstraints={[500, 300]}>
            <span className="text">Resizable box, starting at 200x200. Min size is 150x150, max is 500x300.</span>
          </ResizableBox>
          <ResizableBox className="box box3" width={200} height={200} minConstraints={[150, 150]} maxConstraints={[500, 300]}>
            <span className="text">Resizable box with a handle that only appears on hover.</span>
          </ResizableBox>
          <ResizableBox className="box" width={200} height={200} lockAspectRatio={true}>
            <span className="text">Resizable square with a locked aspect ratio.</span>
          </ResizableBox>
          <ResizableBox className="box" width={200} height={120} lockAspectRatio={true}>
            <span className="text">Resizable rectangle with a locked aspect ratio.</span>
          </ResizableBox>
          <ResizableBox className="box" width={200} height={200} axis="x">
            <span className="text">Only resizable by "x" axis.</span>
          </ResizableBox>
          <ResizableBox className="box" width={200} height={200} axis="y">
            <span className="text">Only resizable by "y" axis.</span>
          </ResizableBox>
          <ResizableBox className="box" width={200} height={200} axis="both">
            <span className="text">Resizable ("both" axis).</span>
          </ResizableBox>
          <ResizableBox className="box" width={200} height={200} axis="none">
            <span className="text">Not resizable ("none" axis).</span>
          </ResizableBox>
          <Resizable className="box" height={this.state.fixedHeight} width={this.state.fixedWidth} onResize={this.onResizeFixed} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}>
            <div
              className="box"
              style={{
                width: this.state.fixedWidth + 'px',
                height: this.state.fixedHeight + 'px',
                position: 'absolute',
                left: this.state.fixedLeft,
                top: this.state.fixedTop,
              }}>
              <span className="text">{"Absolutely positioned <Resizable> element. Resize in all directions."}</span>
            </div>
          </Resizable>
        </div>
      </div>
    );
  }
}
