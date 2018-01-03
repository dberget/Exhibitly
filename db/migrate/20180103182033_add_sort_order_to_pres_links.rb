class AddSortOrderToPresLinks < ActiveRecord::Migration[5.2]
  def change
      add_column :presentation_samples, :sort_id, :integer
    end
end
