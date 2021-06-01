import React from "react";
import {
  BalloonToolbar,
  createAlignPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHistoryPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createParagraphPlugin,
  createReactPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSlatePluginsComponents,
  createSlatePluginsOptions,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_RIGHT,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  getSlatePluginType,
  HeadingToolbar,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  KEYS_HEADING,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  MediaEmbedElement,
  SlatePlugins,
  ToolbarAlign,
  ToolbarImage,
  ToolbarLink,
  ToolbarList,
  ToolbarMark,
  useEventEditorId,
  useStoreEditorRef,
} from "@udecode/slate-plugins";
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatUnderlined,
  MdImage,
  MdLink,
} from "react-icons/md";

const optionsSoftBreakPlugin = {
  rules: [
    { hotkey: "shift+enter" },
    {
      hotkey: "enter",
      query: {
        allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
      },
    },
  ],
};

const optionsExitBreakPlugin = {
  rules: [
    {
      hotkey: "mod+enter",
    },
    {
      hotkey: "mod+shift+enter",
      before: true,
    },
    {
      hotkey: "enter",
      query: {
        start: true,
        end: true,
        allow: KEYS_HEADING,
      },
    },
  ],
};

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

const optionsResetBlockTypePlugin = {
  rules: [
    {
      ...resetBlockTypesCommonRule,
      hotkey: "Enter",
      predicate: isBlockAboveEmpty,
    },
    {
      ...resetBlockTypesCommonRule,
      hotkey: "Backspace",
      predicate: isSelectionAtBlockStart,
    },
  ],
};

const pluginsBasic = [
  createReactPlugin(), // withReact
  createHistoryPlugin(), // withHistory
  createParagraphPlugin(), // paragraph element
  createBlockquotePlugin(), // blockquote element
  createHeadingPlugin(), // heading elements
  createAlignPlugin(),
  createImagePlugin(),
  createLinkPlugin(),
  createSelectOnBackspacePlugin({
    allow: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
  }),
  createBoldPlugin(), // bold mark
  createItalicPlugin(), // italic mark
  createUnderlinePlugin(), // underline mark
  createStrikethroughPlugin(), // strikethrough mark
  createListPlugin(),
  createSoftBreakPlugin(optionsSoftBreakPlugin),
  createExitBreakPlugin(optionsExitBreakPlugin),
  createResetNodePlugin(optionsResetBlockTypePlugin),
  createMediaEmbedPlugin(),
];

const components = createSlatePluginsComponents();
const options = createSlatePluginsOptions();

export const RichTextEditor = (): JSX.Element => {
  const editableProps = {
    placeholder: "Type…",
  };

  const ToolbarButtonsAlign = () => {
    const editor = useStoreEditorRef(useEventEditorId("focus"));

    return (
      <>
        <ToolbarAlign icon={<MdFormatAlignLeft />} />
        <ToolbarAlign
          type={getSlatePluginType(editor, ELEMENT_ALIGN_CENTER)}
          icon={<MdFormatAlignCenter />}
        />
        <ToolbarAlign
          type={getSlatePluginType(editor, ELEMENT_ALIGN_RIGHT)}
          icon={<MdFormatAlignRight />}
        />
        <ToolbarAlign
          type={getSlatePluginType(editor, ELEMENT_ALIGN_JUSTIFY)}
          icon={<MdFormatAlignJustify />}
        />
      </>
    );
  };

  const ToolbarButtonsList = () => {
    const editor = useStoreEditorRef(useEventEditorId("focus"));

    return (
      <>
        <ToolbarList
          type={getSlatePluginType(editor, ELEMENT_UL)}
          icon={<MdFormatListBulleted />}
        />
        <ToolbarList
          type={getSlatePluginType(editor, ELEMENT_OL)}
          icon={<MdFormatListNumbered />}
        />
      </>
    );
  };

  const BallonToolbarMarks = () => {
    const editor = useStoreEditorRef(useEventEditorId("focus"));

    const arrow = false;
    const theme = "dark";
    const direction = "top";
    const hiddenDelay = 0;
    const tooltip: any = {
      arrow: true,
      delay: 0,
      duration: [200, 0],
      hideOnClick: false,
      offset: [0, 17],
      placement: "top",
    };

    return (
      <BalloonToolbar
        direction={direction}
        hiddenDelay={hiddenDelay}
        theme={theme}
        arrow={arrow}
      >
        <ToolbarMark
          type={getSlatePluginType(editor, MARK_BOLD)}
          icon={<MdFormatBold />}
        />
        <ToolbarMark
          type={getSlatePluginType(editor, MARK_ITALIC)}
          icon={<MdFormatItalic />}
        />
        <ToolbarMark
          type={getSlatePluginType(editor, MARK_UNDERLINE)}
          icon={<MdFormatUnderlined />}
        />
      </BalloonToolbar>
    );
  };

  return (
    <>
      <HeadingToolbar>
        <ToolbarButtonsAlign />
        <ToolbarImage icon={<MdImage />} /> <ToolbarLink icon={<MdLink />} />
        <ToolbarButtonsList />
      </HeadingToolbar>
      <BallonToolbarMarks />
      <SlatePlugins
        editableProps={editableProps}
        initialValue={initialValueBasicElements}
        components={components}
        options={options}
        plugins={pluginsBasic}
      />
    </>
  );
};

export const createElement = (
  text = "",
  {
    type = ELEMENT_PARAGRAPH,
    mark,
  }: {
    type?: string;
    mark?: string;
  } = {}
) => {
  const leaf: any = { text };
  if (mark) {
    leaf[mark] = true;
  }

  return {
    type,
    children: [leaf],
  };
};

const initialValueBasicElements = [
  createElement("🧱 Elements", { type: ELEMENT_H1 }),
  createElement("🔥 Basic Elements", { type: ELEMENT_H2 }),
  createElement("These are the most common elements, known as blocks:"),
  createElement("Heading 1", { type: ELEMENT_H1 }),
  createElement("Heading 2", { type: ELEMENT_H2 }),
  createElement("Heading 3", { type: ELEMENT_H3 }),
  createElement("Heading 4", { type: ELEMENT_H4 }),
  createElement("Heading 5", { type: ELEMENT_H5 }),
  createElement("Heading 6", { type: ELEMENT_H6 }),
  createElement("Blockquote", { type: ELEMENT_BLOCKQUOTE }),
  {
    type: ELEMENT_CODE_BLOCK,
    children: [
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const a = 'Hello';",
          },
        ],
      },
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const b = 'World';",
          },
        ],
      },
    ],
  },
  createElement("💅 Marks", { type: ELEMENT_H1 }),
  createElement("💧 Basic Marks", { type: ELEMENT_H2 }),
  createElement(
    "The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code."
  ),
  createElement(
    "You can customize the type, the component and the hotkey for each of these."
  ),
  createElement("This text is bold.", { mark: MARK_BOLD }),
  createElement("This text is italic.", { mark: MARK_ITALIC }),
  createElement("This text is underlined.", {
    mark: MARK_UNDERLINE,
  }),
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: "This text is bold, italic and underlined.",
        [MARK_BOLD]: true,
        [MARK_ITALIC]: true,
        [MARK_UNDERLINE]: true,
      },
    ],
  },
  createElement("This is a strikethrough text.", {
    mark: MARK_STRIKETHROUGH,
  }),
  createElement("This is an inline code.", { mark: MARK_CODE }),
];
