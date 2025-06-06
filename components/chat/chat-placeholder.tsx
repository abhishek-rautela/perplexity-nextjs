export function ChatPlaceholder() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-xl font-bold mb-2">No chat selected</h2>
        <p className="text-muted-foreground">
          Select a chat from the sidebar or start a new conversation
        </p>
      </div>
    </div>
  );
}