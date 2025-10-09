"use client";

import React, { useState } from "react";
import { Button, useButtonLoading } from "./index";
import {
  IconButton,
  ButtonGroup,
  LoadingButton,
  CopyButton,
  ToggleButton,
  SplitButton,
} from "./variants";
import { Icon } from "../Icon";

export const ButtonExamples: React.FC = () => {
  const buttonLoading = useButtonLoading();
  const [togglePressed, setTogglePressed] = useState(false);

  const handleAsyncAction = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Async action completed");
  };

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1>Button Examples</h1>

      {/* Basic Buttons */}
      <section>
        <h2>Variants</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2>Sizes</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      {/* States */}
      <section>
        <h2>States</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Button>Normal</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button
            loading={buttonLoading.isLoading}
            onClick={() => {
              buttonLoading.startLoading();
              setTimeout(buttonLoading.stopLoading, 2000);
            }}
          >
            Click to Load
          </Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2>With Icons</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Button leftIcon={<Icon name="plus" />}>Add Item</Button>
          <Button rightIcon={<Icon name="arrow-right" />}>Continue</Button>
          <Button
            leftIcon={<Icon name="download" />}
            rightIcon={<Icon name="external-link" />}
            variant="outline"
          >
            Download
          </Button>
        </div>
      </section>

      {/* Icon Buttons */}
      <section>
        <h2>Icon Buttons</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <IconButton
            icon={<Icon name="heart" />}
            aria-label="Like"
            size="sm"
          />
          <IconButton icon={<Icon name="share" />} aria-label="Share" />
          <IconButton
            icon={<Icon name="settings" />}
            aria-label="Settings"
            size="lg"
            variant="outline"
          />
          <IconButton
            icon={<Icon name="trash" />}
            aria-label="Delete"
            variant="danger"
          />
        </div>
      </section>

      {/* Button Groups */}
      <section>
        <h2>Button Groups</h2>
        <div style={{ marginBottom: "1rem" }}>
          <h3>Horizontal Group</h3>
          <ButtonGroup>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <h3>Attached Group</h3>
          <ButtonGroup attached>
            <Button variant="outline">First</Button>
            <Button variant="outline">Second</Button>
            <Button variant="outline">Third</Button>
          </ButtonGroup>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <h3>Vertical Group</h3>
          <ButtonGroup orientation="vertical" attached>
            <Button variant="outline">Top</Button>
            <Button variant="outline">Middle</Button>
            <Button variant="outline">Bottom</Button>
          </ButtonGroup>
        </div>
      </section>

      {/* Specialized Buttons */}
      <section>
        <h2>Specialized Buttons</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <LoadingButton
            onClick={handleAsyncAction}
            loadingText="Processing..."
          >
            Async Action
          </LoadingButton>

          <CopyButton
            text="Hello, World!"
            onCopy={() => console.log("Text copied!")}
          >
            Copy Text
          </CopyButton>

          <ToggleButton
            pressed={togglePressed}
            onPressedChange={setTogglePressed}
            pressedChildren="Pressed"
            pressedVariant="success"
          >
            Toggle Me
          </ToggleButton>

          <SplitButton onDropdownClick={() => console.log("Dropdown clicked")}>
            Split Button
          </SplitButton>
        </div>
      </section>

      {/* Full Width */}
      <section>
        <h2>Full Width</h2>
        <div style={{ maxWidth: "400px" }}>
          <Button fullWidth variant="primary" size="lg">
            Full Width Button
          </Button>
        </div>
      </section>

      {/* As Links */}
      <section>
        <h2>As Links</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button as="a" href="#" variant="outline">
            Internal Link
          </Button>
          <Button
            as="a"
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            rightIcon={<Icon name="external-link" />}
          >
            External Link
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ButtonExamples;
