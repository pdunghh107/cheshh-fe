import React from "react";

import { Piece, type PieceColor, type PieceType } from "../piece/Piece";
import { PROMOTION_PIECE_TYPE } from "../piece/utils/pawn/pawn.constants";

import {
  StyledPromotionContainer,
  StyledPromotionOption,
  StyledPromotionOverlay,
} from "./PromotionBoard.styles";

/**
 * PromotionBoard Component
 *
 * @description Hiển thị popup chọn quân phong cấp (Hậu, Xe, Tượng, Mã) đè trực tiếp lên cột phong cấp giống giao diện Chess.com / Lichess.
 *
 * @example
 * // Usage cơ bản:
 * import { PromotionBoard } from '@/features/game/components/promotion/PromotionBoard';
 *
 * {pendingPromotion && (
 *   <PromotionBoard
 *     targetSquare={pendingPromotion.to}
 *     color={pendingPromotion.color}
 *     orientation="white"
 *     onSelect={(pieceType) => handleSelectPromotion(pieceType)}
 *     onCancel={() => setPendingPromotion(null)}
 *   />
 * )}
 */

export interface PromotionBoardProps {
  /** Ô cờ đích của nước phong cấp (e.g. 'e8', 'c1') */
  targetSquare: string;
  /** Màu quân cờ đang phong cấp ('white' | 'black') */
  color: PieceColor;
  /** Hướng nhìn bàn cờ ('white' | 'black') */
  orientation?: PieceColor;
  /** Callback khi người chơi chọn quân phong cấp */
  onSelect: (pieceType: PieceType) => void;
  /** Callback khi người chơi hủy bỏ phong cấp */
  onCancel?: () => void;
}

export const PromotionBoard: React.FC<PromotionBoardProps> = ({
  targetSquare,
  color,
  orientation = "white",
  onSelect,
  onCancel,
}) => {
  const colLetter = targetSquare[0];
  const rowNumber = parseInt(targetSquare[1], 10);

  // Tính cột hiển thị (0 đến 7) dựa vào orientation
  const cols =
    orientation === "white"
      ? ["a", "b", "c", "d", "e", "f", "g", "h"]
      : ["h", "g", "f", "e", "d", "c", "b", "a"];
  const colIndex = cols.indexOf(colLetter);

  // Với Trắng: hàng 8 ở trên cùng (topRow). Với Đen: hàng 1 ở dưới cùng (bottomRow)
  const isTopRow = orientation === "white" ? rowNumber === 8 : rowNumber === 1;

  return (
    <StyledPromotionOverlay onClick={onCancel}>
      <StyledPromotionContainer
        $colIndex={colIndex}
        $isTopRow={isTopRow}
        onClick={(e) => e.stopPropagation()}
      >
        {PROMOTION_PIECE_TYPE.map((pieceType) => (
          <StyledPromotionOption
            key={pieceType}
            onClick={() => onSelect(pieceType)}
            title={`Phong cấp thành ${pieceType.toUpperCase()}`}
          >
            <Piece type={pieceType} color={color} />
          </StyledPromotionOption>
        ))}
      </StyledPromotionContainer>
    </StyledPromotionOverlay>
  );
};

export default PromotionBoard;
