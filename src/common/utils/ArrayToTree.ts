type Item = {
    key: string;
    up_key: string;
    children?: Item[];
};
/**
 * data : 데이터
 * childrenKey : children에 들어갈 객체 키값
 */
export default function ArrayToTree(data: Item[]): Item[] {
    const itemMap: { [key: string]: Item } = {};

    // 데이터 복사본을 만듭니다.
    const items = data.map((item) => ({ ...item, children: [] }));

    // 각 아이템을 맵핑합니다.
    items.forEach((item) => {
        itemMap[item.key] = item;
    });

    // 루트 노드를 담을 배열을 만듭니다.
    const tree: Item[] = [];

    // 각 아이템을 순회하면서 트리를 구성합니다.
    items.forEach((item) => {
        if (item.up_key === "") {
            tree.push(item);
        } else {
            const parent = itemMap[item.up_key];
            if (parent) {
                parent.children?.push(item);
            }
        }
    });

    // 빈 children 속성을 제거하는 재귀 함수
    function removeEmptyChildren(node: Item): Item {
        if (node.children && node.children.length === 0) {
            delete node.children;
        } else if (node.children) {
            node.children = node.children.map(removeEmptyChildren);
        }
        return node;
    }

    // 트리 구조의 각 루트 노드에 대해 빈 children 속성 제거
    return tree.map(removeEmptyChildren);
}
